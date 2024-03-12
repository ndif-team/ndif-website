# Simple static website generation framework, by GPT-4.

import os
import shutil
import importlib.util
import sys
import argparse

# Function to load Python modules from the current directory into the script's namespace
def load_modules():
    namespace = {}
    script_name = os.path.basename(sys.argv[0])
    for file in os.listdir("."):
        if file.endswith(".py") and file != script_name:
            with open(file, 'r') as f:
                code = compile(f.read(), file, 'exec')
                exec(code, namespace)
    return namespace

# Function to escape triple quotes in the template
def escape_triple_quotes(template):
    return template.replace('"""', '\\"\\"\\"')

# Function to expand HTML templates using the loaded namespace
def expand_template(template, namespace, pathname):
    namespace['pathname'] = pathname
    escaped_template = escape_triple_quotes(template)
    try:
        return eval(f'f"""{escaped_template}"""', namespace)
    except (SyntaxError):
        return template
    except (NameError, TypeError, ZeroDivisionError) as e:
        print(f'Ignoring error in {pathname}:', e)
        return template

# Function to generate the static website recursively
def generate_website(src_dir, dest_dir, namespace):
    # Create the output directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)

    # Process files and directories
    for item in os.listdir(src_dir):
        src_path = os.path.join(src_dir, item)
        dest_path = os.path.join(dest_dir, item)

        if os.path.isfile(src_path):
            if item.endswith(".html"):
                with open(src_path, "r") as f:
                    template = f.read()
                pathname = os.path.join('/', os.path.relpath(src_path, src_dir))
                expanded_html = expand_template(template, namespace, pathname)
                with open(dest_path, "w") as f:
                    f.write(expanded_html)
            elif not item.endswith(".py"):
                shutil.copy2(src_path, dest_path)
        elif os.path.isdir(src_path):
            generate_website(src_path, dest_path, namespace)

# Run the website generation
def main():
    # Parse command-line arguments using argparse
    parser = argparse.ArgumentParser(description='Static website generator')
    parser.add_argument('-s', '--source', default='./', help='Source directory')
    parser.add_argument('-t', '--target', default='../public', help='Target directory')
    args = parser.parse_args()

    # Load Python modules into a single namespace
    namespace = load_modules()

    # Generate the static website recursively
    generate_website(args.source, args.target, namespace)

    print("Static website generated successfully!")

if __name__ == "__main__":
    main()

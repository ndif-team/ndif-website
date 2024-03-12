# Simple static website generation framework, by GPT-4.

import os
import shutil
import importlib.util
import sys

# Function to load Python modules from the current directory into a single namespace
def load_modules():
    namespace = {}
    script_name = os.path.basename(sys.argv[0])
    for file in os.listdir("."):
        if file.endswith(".py") and file != script_name:
            module_name = file[:-3]
            spec = importlib.util.spec_from_file_location(module_name, file)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            for name, obj in vars(module).items():
                if callable(obj):
                    namespace[name] = obj
    return namespace

# Function to escape triple quotes in the template
def escape_triple_quotes(template):
    return template.replace('"""', '\\"\\"\\"')

# Function to expand HTML templates using the loaded namespace
def expand_template(template, namespace):
    escaped_template = escape_triple_quotes(template)
    try:
        return eval(f'f"""{escaped_template}"""', namespace)
    except (SyntaxError, NameError, TypeError, ZeroDivisionError):
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
                expanded_html = expand_template(template, namespace)
                with open(dest_path, "w") as f:
                    f.write(expanded_html)
            elif not item.endswith(".py"):
                shutil.copy2(src_path, dest_path)
        elif os.path.isdir(src_path):
            generate_website(src_path, dest_path, namespace)

# Run the website generation
def main():
    # Load Python modules into a single namespace
    namespace = load_modules()

    # Generate the static website recursively
    generate_website(".", "../public", namespace)

    print("Static website generated successfully!")

if __name__ == "__main__":
    main()

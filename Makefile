# Build the Next.js app in src/ and publish the static export to public/.
# Anything in public/ on main is automatically served (same contract as the
# old Python-built site). Uses bun when available, npm otherwise.
PKG := $(shell command -v bun >/dev/null 2>&1 && echo bun || echo npm)

.PHONY: all clean

all:
	cd src && $(PKG) install && $(PKG) run build
	rm -rf public
	cp -R src/out public

clean:
	rm -rf public src/out src/.next

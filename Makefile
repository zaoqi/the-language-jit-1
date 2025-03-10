ALL = ecmascript3_commonjs/lang.js

all: $(ALL)
.PHONY: all

clean:
	rm $(ALL) */node_modules
.PHONY: clean

test: ecmascript3_commonjs/node_modules
	$(MAKE) all
	cd ecmascript3_commonjs && yarn test
.PHONY: test

typescript/node_modules: typescript/yarn.lock
	cd typescript && yarn && touch node_modules/

ecmascript3_commonjs/node_modules: ecmascript3_commonjs/yarn.lock
	cd ecmascript3_commonjs && yarn && touch node_modules/

ecmascript3_commonjs/lang.ts: typescript/lang.ts.d/*.ts typescript/lang.ts.d/ecmascript3.d/*.ts
	cat typescript/lang.ts.d/*.ts typescript/lang.ts.d/ecmascript3.d/*.ts > ecmascript3_commonjs/lang.ts

ecmascript3_commonjs/lang.js: ecmascript3_commonjs/tsconfig.json ecmascript3_commonjs/lang.ts ecmascript3_commonjs/node_modules
	cd ecmascript3_commonjs && ./node_modules/.bin/tsc

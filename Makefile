run:
	./node_modules/.bin/nodemon --watch 'src/*/**' -e ts,tsx --exec 'ts-node' ./src/app.ts

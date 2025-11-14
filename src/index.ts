export function greet(name: string = 'World'): string {
    return `Hello, ${name}!`;
}

if (require.main === module) {
    // When run with `npm run dev` or `node dist/index.js` this logs a greeting.
    // Keep logic minimal so the project compiles and runs out of the box.
    // eslint-disable-next-line no-console
    console.log(greet());
}
// Simple example entrypoint for the TypeScript Node project
export function hello(name: string): string {
    return `Hello, ${name}!`;
}

if (require.main === module) {
    // run when invoked directly: `node dist/index.js` (after build) or `npm run dev` for development
    const name = process.argv[2] || 'world';
    // eslint-disable-next-line no-console
    console.log(hello(name));
}

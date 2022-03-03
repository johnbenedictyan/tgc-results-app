if (!process.env["MONGODB_URI"]) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
const MONGODB_URI = process.env["MONGODB_URI"];

if (!process.env["JWT_SECRET"]) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}

const JWT_SECRET = process.env["JWT_SECRET"];

export {
    MONGODB_URI, JWT_SECRET
}
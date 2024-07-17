/** @format */

import cassandra from "cassandra-driver";

const client = new cassandra.Client({
  contactPoints: ["your-contact-point"],
  localDataCenter: "your-data-center",
  keyspace: "your-keyspace", 
  credentials: { username: "your-username", password: "your-password" },
});

client
  .connect()
  .then(() => console.log("Connected to ScyllaDB"))
  .catch((err) => console.error("Error connecting to ScyllaDB:", err));

export default client;

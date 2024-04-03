import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "absence-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "absence-group" });

export const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "absence_notifications",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {},
  });
};

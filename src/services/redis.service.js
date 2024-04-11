const redis = require("redis");
class RedisService {
  async produce(topic, message) {
    console.log("topic: ", topic);
    console.log("message: ", message);
    const publisher = redis.createClient();
    await publisher.connect();
    try {
      await publisher.publish(topic, JSON.stringify(message));
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async consumer(topic) {
    let messages;
    const subscriber = redis.createClient();
    await subscriber.subscribe(topic, (message) => {
      messages = JSON.parse(message);
    });
    return messages;
  }
}

module.exports = RedisService;

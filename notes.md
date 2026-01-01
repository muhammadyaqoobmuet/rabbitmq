Rabbit Mq is just a broker
Producer → The person who wants to send  (messages).
Exchange → The post office that decides where the letter should go.
Queue → The mailbox that collects  for someone to pick up.
Consumer → The person who picks up the message (reads messages).

BUT HOW IT WORKS
Producer sends a message → goes to Exchange.
Exchange looks at bindings + routing keys → decides which queue(s) get the message.
Queue collects the message → Consumer reads it.

There are different types of exchanges
Direct Exchange
Uses routing keys exactly Only queues bound with the exact same routing key get the message.
examples shown in code
work flow
```
Queue "Q1" bound with routing key "blue"
Message with routing key "blue" → goes to Q1
Message with routing key "red" → goes nowhere
```








# my dumb questions when i was learning
why do we create queues on consumer side
-> where would we store the messages from producer that exchange sends ? right in queue thats why we create those
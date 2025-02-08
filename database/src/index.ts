import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
});

//declare a route here

async function startServer() {
    try {
        await fastify.listen({ port: 5000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();
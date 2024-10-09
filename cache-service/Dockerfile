FROM redis:6
# Expose port
EXPOSE 6379
# Set user and group
RUN groupadd -g 1000 redisgroup && useradd -u 1000 -g redisgroup redisuser
USER redisuser
# Run command
CMD ["redis-server"]
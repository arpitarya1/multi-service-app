FROM postgres:13
ENV POSTGRES_USER=client
ENV POSTGRES_PASSWORD=clientpassword
ENV POSTGRES_DB=clientdb
# Set user and group
RUN groupadd -g 1001 postgresgroup && useradd -u 1001 -g postgresgroup postgresuser
USER postgresuser
# Copy init.sql
COPY init.sql /docker-entrypoint-initdb.d/
# Expose port
EXPOSE 5432
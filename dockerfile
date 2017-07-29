FROM node:8.2

# Create and set the working directory
RUN mkdir -p /public
WORKDIR /public

# Copy the current directory contents into the container 
COPY . /public

# Define environment variable
ENV PORT=3030
# Install any needed packages with yarn (should be bundled with official node image)
RUN yarn
RUN ["yarn", "build"]

# Run when the container launches

CMD ["yarn", "start"]

# Make port 3030 available to the world outside this container
EXPOSE 3030
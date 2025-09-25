# Task TG + CloudFlare + React

# Install Docker

Download and install Docker.

Clone the project
git clone https://github.com/ihorbilash/task_cf.git

# env & docker

add .env (.env.test)
docker compose -f docker-compose.yml up -d

# Install and Run

(install dependencies)
npm install

(run api)
npm run api:start:dev

(run UI)
npm run web-client:dev

# Description

This bot allows you to manage domains and DNS records in Cloudflare directly from a Telegram chat.

1. Adding the Bot

- Add the bot to your desired chat or group.
- The bot always checks the chat ID to ensure that commands are executed only in approved chats.
- Use /help to see the list of available commands.

2. Available Commands

- /help
  Show this help message with all available commands.

- /askPermission
  Request access to use the Cloudflare Bot( added Telegram user to database with allowed status - false).

- /registerDomain < domain >
  Register a new domain in Cloudflare.
  Example:
  /registerDomain mydomain.com

- /addRecord <zoneId> <type> <name> <value>
  Add a new DNS record.
  type: supported DNS record type (e.g., A, CNAME, TXT …)
  name: subdomain or @ for root (e.g., www)
  value: IP address or target value (e.g., 192.168.0.1)
  Example:
  /addRecord <zoneId> A www 192.168.0.1

- /updateRecord <zoneId> <recordId> <newValue>
  Update an existing DNS record.
  Example:
  /updateRecord <zoneId> 123456789 203.0.113.10

- /deleteRecord <zoneId> <recordId>
  Delete a DNS record.
  Example:
  /deleteRecord <zoneId> 123456789

3.  UI Admin Panel
    Simple Admin Panel (web interface) where administrators can manage user permissions.

    - View all users who have requested access.
    - See their Telegram username, Telegram ID, and current status (allowed or not).
    - Change the allowed status for any user directly from the panel.

    This panel ensures that only approved users can interact with the Cloudflare Bot in Telegram.

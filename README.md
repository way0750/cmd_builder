# CMD_Builder

#### This repo contains some tools to make fend team's life a little bit easier.
![Frustrated Code Monkey](./giphy-downsized-medium.gif)

# how to install
1. Install all the dependencies
`npm install`
2. Build the tools by running
`npm run build`
This will ask you to provide your password.
Because this will both build all the tools and set permission to them (so they will be executable in the terminal)
3. Add the /cmds path to your terminal profile
Now you have all the commands at cmd_builder/cmds, but your terminal will not be able to find these commands until you tell it where to search for the new commands.
Edit the following and add it to your .zshrc or .bashrc : 
`export PATH=/full/path/to/your/cmd_builder/cmds/:$PATH`
5. Add all the marin repos paths in config
at: `cmd_builder/config/settings.ts`
Not doing this will result in lots of files not found errors

## Command List
Nothing yet

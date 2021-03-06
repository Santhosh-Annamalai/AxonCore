'use string';
import { Signale } from 'signale';
import figures from 'figures';

const options = {
    types: {
        verbose: {
            badge: figures.info,
            label: 'verbose',
            color: 'gray',
        },
        axon: {
            badge: figures.star,
            label: 'axon',
            color: 'magenta',
        },
        init: {
            badge: figures.play,
            label: 'init',
            color: 'green',
        },
        moduleS: {
            badge: 'M',
            label: 'module',
            color: 'blue',
        },
        commandS: {
            badge: 'C',
            label: 'command',
            color: 'cyan',
        },
        subcmdS: {
            badge: 'c',
            label: 'subcmd',
            color: 'cyanBright',
        },
    },
};

class SignaleLogger extends Signale {
    constructor(options) {
        super(options);

        this.config({
            displayTimestamp: true,
        });
    }

    // Renames
    emerg(input) {
        this.fatal(input);
    }

    notice(input) {
        this.note(input);
    }

    // Custom methods
    initModule(module) {
        this.moduleS(`[${module.label}] Initialised! Commands loaded -${module.commands.size}-`);
    }

    initCommand(command) {
        let mess;
        if (command.hasSubcmd) {
            mess = `${command.label} Initialised! Subcommands loaded -${command.subCommands.size}-`;
        } else {
            mess = `${command.label} Initialised!`;
        }
        this.commandS(mess);
    }

    initSubCmd(sub) {
        let mess;
        if (sub.hasSubcmd) {
            mess = `${sub.label} Initialised! Subcommands loaded -${sub.subCommands.size}-`;
        } else {
            mess = `${sub.label} Initialised!`;
        }
        this.subcmdS(mess);
    }
}

export default new SignaleLogger(options);

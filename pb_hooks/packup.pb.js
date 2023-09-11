$app.rootCmd.addCommand(
	new Command({
		use: 'backup',
		run: (cmd, args) => {
			$app.createBackup($app.rootCmd.context(), `startup_${new Date(Date.now()).toJSON()}.zip`);
		}
	})
);

$app.rootCmd.addCommand(
	new Command({
		use: 'restore',
		run: (cmd, args) => {
			$app.createBackup($app.rootCmd.context(), `${args}.zip`);
		}
	})
);

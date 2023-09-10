$app.rootCmd.addCommand(
	new Command({
		use: 'backup',
		run: (cmd, args) => {
			$app.createBackup($app.rootCmd.context(), `startup_${new Date(Date.now()).toJSON()}.zip`);
		}
	})
);

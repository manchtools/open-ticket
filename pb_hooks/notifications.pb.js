onRecordAfterCreateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		const newRecord = e.record;
		const collection = $app.dao().findCollectionByNameOrId('notifications');
		const allAgents = arrayOf(new Record());
		$app.dao().recordQuery('users').select('id').andWhere($dbx.exp("type='agent'")).all(allAgents);
		let tmpRecord = {
			payload: {
				action: 'created',
				resourceType: '',
				resource: newRecord,
				trigger: info?.authRecord?.get('name') || info?.authRecord?.get('email') || 'system'
			},
			recipients: []
		};
		if (e.collection.name === 'tickets') {
			tmpRecord.payload.resourceType = 'ticket';
			if (newRecord.get('agent')) {
				tmpRecord.recipients = newRecord.agent;
			}
			if (newRecord.get('queue')) {
				const queue = $app.dao().findRecordById('queues', newRecord.get('queue'));
				tmpRecord.recipients = queue.get('members');
			}
			if (!newRecord.get('agent') && !newRecord.get('queue')) {
				tmpRecord.recipients = allAgents.map((el) => {
					return el.id;
				});
			}
		}

		if (e.collection.name === 'replies') {
			const ticket = $app.dao().findRecordById('tickets', newRecord.get('ticket'));
			tmpRecord.payload.resourceType = 'reply';
			if (newRecord.get('createdBy') === ticket.get('createdBy')) {
				if (ticket.get('agent')) {
					tmpRecord.recipients = [ticket.get('agent')];
				}
				if (!ticket.get('agent') && ticket.get('queue')) {
					const queue = $app.dao().findRecordById('queues', newRecord.queue);
					tmpRecord.recipients = queue.get('members');
				}
				if (!ticket.get('agent') && !ticket.get('queue')) {
					tmpRecord.recipients = allAgents.map((el) => {
						return el.id;
					});
				}
			} else {
				if (newRecord.get('private')) {
					return;
				} else {
					tmpRecord.recipients = ticket.get('createdBy');
				}
			}
		}

		if (e.collection.name === 'queues') {
			tmpRecord.payload.resourceType = 'queue';
			if (newRecord.get('members').length > 0) {
				tmpRecord.recipients = newRecord.get('members');
			} else {
				tmpRecord.recipients = allAgents.map((el) => {
					return el.id;
				});
			}
		}
		const index = tmpRecord?.recipients?.indexOf(info?.authRecord?.id);
		if (index > -1) {
			tmpRecord.recipients.splice(index, 1);
		}
		const record = new Record(collection, tmpRecord);
		$app.dao().saveRecord(record);
	},
	'tickets',
	'replies',
	'queues'
);

onRecordBeforeUpdateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		const newRecord = e.record;

		const collection = $app.dao().findCollectionByNameOrId('notifications');
		const allAgents = arrayOf(new Record());
		$app.dao().recordQuery('users').select('id').andWhere($dbx.exp("type='agent'")).all(allAgents);
		let tmpRecord = {
			payload: {
				action: 'updated',
				resourceType: '',
				resource: newRecord,
				trigger: info?.authRecord?.get('name') || info?.authRecord?.get('email') || 'system'
			},
			recipients: []
		};

		if (e.collection.name === 'tickets') {
			const oldRecord = $app.dao().findRecordById('tickets', newRecord.id);
			tmpRecord.payload.resourceType = 'ticket';
			if (oldRecord.get('replies').length === newRecord.get('replies').length) {
				if (newRecord.get('agent')) {
					tmpRecord.recipients = newRecord.agent;
				}
				if (newRecord.get('queue')) {
					const queue = $app.dao().findRecordById('queues', newRecord.get('queue'));
					tmpRecord.recipients = queue.get('members');
				}
				if (!newRecord.get('agent') && !newRecord.get('queue')) {
					tmpRecord.recipients = allAgents.map((el) => {
						return el.id;
					});
				}
			}
		}

		if (e.collection.name === 'replies') {
			const ticket = $app.dao().findRecordById('tickets', newRecord.get('ticket'));
			tmpRecord.payload.resourceType = 'reply';
			if (newRecord.get('createdBy') === ticket.get('createdBy')) {
				if (ticket.get('agent')) {
					tmpRecord.recipients = [ticket.get('agent')];
				}
				if (!ticket.get('agent') && ticket.get('queue')) {
					const queue = $app.dao().findRecordById('queues', newRecord.queue);
					tmpRecord.recipients = queue.get('members');
				}
				if (!ticket.get('agent') && !ticket.get('queue')) {
					tmpRecord.recipients = allAgents.map((el) => {
						return el.id;
					});
				}
			} else {
				if (newRecord.get('private')) {
					return;
				} else {
					tmpRecord.recipients = ticket.get('createdBy');
				}
			}
		}

		if (e.collection.name === 'queues') {
			tmpRecord.payload.resourceType = 'queue';
			if (newRecord.get('members').length > 0) {
				tmpRecord.recipients = newRecord.get('members');
			} else {
				tmpRecord.recipients = allAgents.map((el) => {
					return el.id;
				});
			}
		}
		const index = tmpRecord?.recipients?.indexOf(info?.authRecord?.id);
		if (index > -1) {
			tmpRecord.recipients.splice(index, 1);
		}
		const record = new Record(collection, tmpRecord);
		$app.dao().saveRecord(record);
	},
	'tickets',
	'replies',
	'queues'
);

onModelBeforeCreate((e) => {
	let jsonModel = JSON.parse(JSON.stringify(e.model));
	const users = $app.dao().findRecordsByIds('users', [...jsonModel.recipients]);
	users.map((user) => {
		const parsedUser = JSON.parse(JSON.stringify(user));
		if (parsedUser.notificationPrefs) {
			if (jsonModel.payload.resourceType === 'ticket') {
				if (
					parsedUser.notificationPrefs.indexOf(
						`${jsonModel.payload.resourceType}.*.${jsonModel.payload.action}`
					) !== -1
				) {
					return;
				}
				if (
					parsedUser.notificationPrefs.indexOf(
						`${jsonModel.payload.resourceType}.${jsonModel.payload.id}.${jsonModel.payload.action}`
					) !== -1
				) {
					return;
				}
			}
			if (jsonModel.payload.resourceType === 'reply') {
				if (
					parsedUser.notificationPrefs.indexOf(
						`ticket.*.${jsonModel.payload.resourceType}.*.${jsonModel.payload.action}`
					) !== -1
				) {
					return;
				}
				if (
					parsedUser.notificationPrefs.indexOf(
						`ticket.${jsonModel.payload.resource.ticket}.${jsonModel.payload.resourceType}.*.${jsonModel.payload.action}`
					) !== -1
				) {
					return;
				}
			}
			if (jsonModel.payload.resourceType === 'queue') {
				if (parsedUser.notificationPrefs.indexOf(`queue.*.${jsonModel.payload.action}`) !== -1) {
					return;
				}
				if (
					parsedUser.notificationPrefs.indexOf(
						`queue.${jsonModel.payload.resource.id}.${jsonModel.payload.action}`
					) !== -1
				) {
					return;
				}
			}
			const index = jsonModel.recipients.indexOf(parsedUser.id);
			if (index > -1) {
				jsonModel.recipients.splice(index, 1);
			}
		}
	});
	if (jsonModel.recipients.length === 0) {
		return false;
	} else {
		e.model.set('recipients', jsonModel.recipients);
	}
}, 'notifications');

onModelAfterCreate((e) => {
	const users = $app.dao().findRecordsByIds('users', [...e.model.get('recipients')]);
	$app.dao().expandRecords(users, ['pushSubscriptions'], null);
	users.map((user) => {
		if (user.expandedAll('pushSubscriptions').length > 0) {
			user.expandedAll('pushSubscriptions').map(async (subscription) => {
				try {
					const res = $http.send({
						url: $os.getenv('PRIVATE_OPEN_TICKET_URL') + '/push',
						method: 'POST',
						body: JSON.stringify({
							subscription: JSON.parse(subscription.get('subscription')),
							payload: JSON.parse(e.model.get('payload'))
						}),
						headers: {
							'content-type': 'application/json',
							origin: $os.getenv('PRIVATE_POCKETBASE_URL')
						}
					});
					const responseJson = await res.json;
					if (responseJson.success === false) {
						$app
							.dao()
							.deleteRecord($app.dao().findRecordById('pushSubscriptions', subscription.id));
					}
				} catch (e) {
					console.log(e);
				}
			});
		}
	});
}, 'notifications');

onModelBeforeCreate((e) => {
	try {
		const res = $app
			.dao()
			.findFirstRecordByData('pushSubscriptions', 'subscription', e.model.get('subscription'));
		return false;
	} catch (e) {}
}, 'pushSubscriptions');

onModelAfterCreate((e) => {
	const user = $app.dao().findRecordById('users', e.model.get('user'));
	user.set('pushSubscriptions', [...user.get('pushSubscriptions'), e.model.id]);
	$app.dao().saveRecord(user);
}, 'pushSubscriptions');

cronAdd('removeOldNotifications', '@daily', () => {
	$app
		.dao()
		.db()
		.newQuery('DELETE FROM notifications where created < Date("now", "-30 days")')
		.execute();
});

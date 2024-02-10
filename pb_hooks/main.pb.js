onRecordAfterUpdateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		let tmpRecord = JSON.parse(JSON.stringify(e.record));
		let collection;

		if (e.collection.name === 'tickets') {
			collection = $app.dao().findCollectionByNameOrId('tickets_versions');
			tmpRecord['ticket'] = e.record.id;
		}
		if (e.collection.name === 'replies') {
			collection = $app.dao().findCollectionByNameOrId('replies_versions');
			tmpRecord['reply'] = e.record.id;
		}

		if (info.authRecord) {
			tmpRecord['updatedBy'] = info.authRecord.id;
		}
		delete tmpRecord.id;
		delete tmpRecord.created;
		delete tmpRecord.updated;
		const record = new Record(collection, tmpRecord);
		$app.dao().saveRecord(record);
	},
	'tickets',
	'replies'
);

onRecordAfterCreateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		let tmpRecord = JSON.parse(JSON.stringify(e.record));
		let collection;
		if (e.collection.name === 'tickets') {
			collection = $app.dao().findCollectionByNameOrId('tickets_versions');
			tmpRecord['ticket'] = e.record.id;
		}
		if (e.collection.name === 'replies') {
			collection = $app.dao().findCollectionByNameOrId('replies_versions');
			tmpRecord['reply'] = e.record.id;
		}
		if (info.authRecord) {
			tmpRecord['updatedBy'] = info.authRecord.id;
		}
		delete tmpRecord.id;
		delete tmpRecord.created;
		delete tmpRecord.updated;
		const record = new Record(collection, tmpRecord);
		$app.dao().saveRecord(record);
	},
	'tickets',
	'replies'
);
onRecordBeforeUpdateRequest(
	(e) => {
		throw new BadRequestError("Can't update version records");
	},
	'replies_versions',
	'tickets_versions'
);

onRecordBeforeDeleteRequest(
	(e) => {
		throw new BadRequestError("Can't delete version records");
	},
	'replies_versions',
	'tickets_versions'
);

onRecordBeforeUpdateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		e.record.set('updatedBy', info.authRecord?.id);
	},
	'tickets',
	'replies'
);

onRecordBeforeCreateRequest(
	(e) => {
		const info = $apis.requestInfo(e.httpContext);
		e.record.set('createdBy', info.authRecord?.id);
	},
	'tickets',
	'replies'
);

onRecordBeforeCreateRequest((e) => {
	const info = $apis.requestInfo(e.httpContext);
	e.record.set('status', 'new');
}, 'tickets');

onModelBeforeCreate((e) => {
	if (e.model.get('type') === 'agent') {
		e.model.set('notificationPrefs', [
			'ticket.*.created',
			'ticket.*.updated',
			'ticket.*.deleted',
			'ticket.*.reply.*.created',
			'ticket.*.reply.*.updated',
			'ticket.*.reply.*.deleted',
			'queue.*.created',
			'queue.*.updated',
			'queue.*.deleted'
		]);
		e.model.set('emailVisibility', true);
	}
	if (e.model.get('type') === 'limitedAgent') {
		e.model.set('notificationPrefs', [
			'ticket.*.created',
			'ticket.*.updated',
			'ticket.*.deleted',
			'ticket.*.reply.*.created',
			'ticket.*.reply.*.updated',
			'ticket.*.reply.*.deleted'
		]);
		e.model.set('emailVisibility', true);
	}

	if (e.model.get('type') === 'user') {
		e.model.set('notificationPrefs', [
			'ticket.*.created',
			'ticket.*.updated',
			'ticket.*.deleted',
			'ticket.*.reply.*.created',
			'ticket.*.reply.*.updated',
			'ticket.*.reply.*.deleted'
		]);
	}
	e.model.set('verified', true);
}, 'users');

onModelBeforeUpdate((e) => {
	if (e.model.get('type') === 'agent' || e.model.get('type') === 'limitedAgent') {
		e.model.set('emailVisibility', true);
	} else {
		e.model.set('emailVisibility', false);
	}
}, 'users');

onRecordAfterUpdateRequest((e) => {
	let tmpRecord = JSON.parse(JSON.stringify(e.record));
	const collection = $app.dao().findCollectionByNameOrId('tickets_versions');
	tmpRecord['ticket'] = e.record.id;
	delete tmpRecord.id;
	delete tmpRecord.created;
	delete tmpRecord.updated;
	const record = new Record(collection, tmpRecord);
	$app.dao().saveRecord(record);
}, 'tickets');

onRecordAfterCreateRequest((e) => {
	let tmpRecord = JSON.parse(JSON.stringify(e.record));
	const collection = $app.dao().findCollectionByNameOrId('tickets_versions');
	tmpRecord['ticket'] = e.record.id;
	delete tmpRecord.id;
	delete tmpRecord.created;
	delete tmpRecord.updated;
	const record = new Record(collection, tmpRecord);
	$app.dao().saveRecord(record);
}, 'tickets');

onRecordAfterUpdateRequest((e) => {
	let tmpRecord = JSON.parse(JSON.stringify(e.record));
	const collection = $app.dao().findCollectionByNameOrId('replies_versions');
	tmpRecord['ticket'] = e.record.id;
	delete tmpRecord.id;
	delete tmpRecord.created;
	delete tmpRecord.updated;
	const record = new Record(collection, tmpRecord);
	$app.dao().saveRecord(record);
}, 'replies');

onRecordAfterCreateRequest((e) => {
	let tmpRecord = JSON.parse(JSON.stringify(e.record));
	const collection = $app.dao().findCollectionByNameOrId('replies_versions');
	tmpRecord['reply'] = e.record.id;
	delete tmpRecord.id;
	delete tmpRecord.created;
	delete tmpRecord.updated;
	const record = new Record(collection, tmpRecord);
	$app.dao().saveRecord(record);
}, 'replies');

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

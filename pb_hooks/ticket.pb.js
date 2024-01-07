onRecordBeforeCreateRequest((e) => {
	const info = $apis.requestInfo(e.httpContext);
	e.record.set('createdBy', info.authRecord?.id);
	e.record.set('status', 'new');
}, 'tickets');

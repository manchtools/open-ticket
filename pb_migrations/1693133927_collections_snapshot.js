/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const snapshot = [
			{
				id: '79ttfu5qeuc85nj',
				created: '2023-08-03 15:31:13.761Z',
				updated: '2023-08-25 17:40:09.887Z',
				name: 'tickets',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'sr5dln3w',
						name: 'subject',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'wgbtdwwz',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: 1,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'nq5gyxz5',
						name: 'deleted',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'cus5pia0',
						name: 'status',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['open', 'closed', 'pending', 'resolved', 'new', 'in progress']
						}
					},
					{
						system: false,
						id: 'pbhwozlc',
						name: 'agent',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'wajcoqid',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'faxa4swp',
						name: 'replies',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'kv43ne5p',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: ['id']
						}
					},
					{
						system: false,
						id: 'g47skpod',
						name: 'queue',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: 'arajxvnubpek5cz',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: ['CREATE INDEX `idx_dku9BAk` ON `tickets` (\n  `subject`,\n  `body`\n)'],
				listRule:
					'@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null)',
				viewRule:
					'@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null)',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0)',
				deleteRule: '',
				options: {}
			},
			{
				id: '0sgkselqp3o3cly',
				created: '2023-08-03 15:32:32.084Z',
				updated: '2023-08-20 13:04:14.895Z',
				name: 'replies',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: '9hbz56r6',
						name: 'private',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: '4bobug9c',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'v8czlzus',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'n87tr8h7',
						name: 'ticket',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'hvhyprbl',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule:
					'(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent"',
				viewRule:
					'(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent"',
				createRule: '@request.auth.id = ticket.createdBy.id||@request.auth.type = "agent"',
				updateRule: '@request.auth.type = "agent"',
				deleteRule: null,
				options: {}
			},
			{
				id: '60k1z3y4mg2q2en',
				created: '2023-08-04 15:20:51.449Z',
				updated: '2023-08-20 13:04:14.895Z',
				name: 'replies_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'bpamjnu9',
						name: 'private',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'c7hkca1w',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'bwjsbcbh',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'dzsjaciq',
						name: 'ticket',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'fmwr7ccs',
						name: 'reply',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'zka4wojp',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.type = "agent"',
				viewRule: '@request.auth.type = "agent"',
				createRule: null,
				updateRule: null,
				deleteRule: null,
				options: {}
			},
			{
				id: '_pb_users_auth_',
				created: '2023-08-13 15:43:17.277Z',
				updated: '2023-08-20 13:04:14.895Z',
				name: 'users',
				type: 'auth',
				system: false,
				schema: [
					{
						system: false,
						id: 'users_name',
						name: 'name',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'users_avatar',
						name: 'avatar',
						type: 'file',
						required: false,
						unique: false,
						options: {
							maxSelect: 1,
							maxSize: 5242880,
							mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
							thumbs: null,
							protected: false
						}
					},
					{
						system: false,
						id: 'z6aerqau',
						name: 'type',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['user', 'agent']
						}
					}
				],
				indexes: [],
				listRule: 'id = @request.auth.id||type = "agent"||@request.auth.type = "agent"',
				viewRule: 'id = @request.auth.id||type = "agent"||@request.auth.type = "agent"',
				createRule: '@request.data.type = "user"||@request.auth.type = "agent"',
				updateRule:
					'(id = @request.auth.id&&(@request.data.type = type|| @request.data.type=null))||@request.auth.type = "agent"',
				deleteRule: '@request.auth.type = "agent"',
				options: {
					allowEmailAuth: true,
					allowOAuth2Auth: true,
					allowUsernameAuth: true,
					exceptEmailDomains: null,
					manageRule: '@request.auth.type = "agent"',
					minPasswordLength: 8,
					onlyEmailDomains: null,
					requireEmail: true
				}
			},
			{
				id: 'arajxvnubpek5cz',
				created: '2023-08-20 12:56:59.195Z',
				updated: '2023-08-25 17:24:51.833Z',
				name: 'queues',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'duyplkik',
						name: 'name',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'ygf0dzs7',
						name: 'members',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != ""',
				viewRule: '@request.auth.id != ""',
				createRule: '@request.auth.type = "agent"',
				updateRule: '@request.auth.type = "agent"',
				deleteRule: '@request.auth.type = "agent"',
				options: {}
			},
			{
				id: 'syjk74037ozdtam',
				created: '2023-08-27 10:57:44.792Z',
				updated: '2023-08-27 10:57:44.792Z',
				name: 'tickets_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'e2jufsnj',
						name: 'subject',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: '8uslfqfs',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: 1,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'gggxt7nl',
						name: 'deleted',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'rlcgkpc9',
						name: 'status',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['open', 'closed', 'pending', 'resolved', 'new', 'in progress']
						}
					},
					{
						system: false,
						id: 'i33wuf5f',
						name: 'agent',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: '3kseup7d',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'dhnuehhk',
						name: 'replies',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: []
						}
					},
					{
						system: false,
						id: '67fkymp2',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: ['id']
						}
					},
					{
						system: false,
						id: 'qak5bsrh',
						name: 'queue',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: 'arajxvnubpek5cz',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'jeyzqqll',
						name: 'ticket',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule:
					'@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null)',
				viewRule:
					'@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null)',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0)',
				deleteRule: '',
				options: {}
			}
		];

		const collections = snapshot.map((item) => new Collection(item));

		return Dao(db).importCollections(collections, true, null);
	},
	(db) => {
		const snapshot = [
			{
				id: '79ttfu5qeuc85nj',
				created: '2023-08-03 15:31:13.761Z',
				updated: '2023-08-16 10:37:18.941Z',
				name: 'tickets',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'sr5dln3w',
						name: 'subject',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'wgbtdwwz',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: 1,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'nq5gyxz5',
						name: 'deleted',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'cus5pia0',
						name: 'status',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['open', 'closed', 'pending', 'resolved', 'new', 'in progress']
						}
					},
					{
						system: false,
						id: 'pbhwozlc',
						name: 'agent',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'wajcoqid',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'faxa4swp',
						name: 'replies',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'kv43ne5p',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: ['id']
						}
					}
				],
				indexes: ['CREATE INDEX `idx_dku9BAk` ON `tickets` (\n  `subject`,\n  `body`\n)'],
				listRule: '@request.auth.id = createdBy.id||@request.auth.type = "agent"',
				viewRule: '@request.auth.id = createdBy.id||@request.auth.type = "agent"',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0)',
				deleteRule: '',
				options: {}
			},
			{
				id: '0sgkselqp3o3cly',
				created: '2023-08-03 15:32:32.084Z',
				updated: '2023-08-11 10:18:02.415Z',
				name: 'replies',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: '9hbz56r6',
						name: 'private',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: '4bobug9c',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'v8czlzus',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'n87tr8h7',
						name: 'ticket',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'hvhyprbl',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule:
					'(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent"',
				viewRule:
					'(@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent"',
				createRule: '@request.auth.id = ticket.createdBy.id||@request.auth.type = "agent"',
				updateRule: '@request.auth.type = "agent"',
				deleteRule: null,
				options: {}
			},
			{
				id: 'vqabe9s01biwqz2',
				created: '2023-08-04 14:57:31.290Z',
				updated: '2023-08-12 15:33:17.633Z',
				name: 'tickets_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'eknp4wze',
						name: 'subject',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: '2ifcwjft',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: 1,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'mmtfzmjq',
						name: 'deleted',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'fmw0ist2',
						name: 'status',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['open', 'closed', 'pending', 'resolved', 'new', 'in progress']
						}
					},
					{
						system: false,
						id: 'csplqsmd',
						name: 'agent',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'xtgxhfua',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'pagqwrrv',
						name: 'ticket',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'lgzdqe0o',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'acnp3i8b',
						name: 'replies',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: []
						}
					}
				],
				indexes: ['CREATE INDEX `idx_q2yswxM` ON `tickets_versions` (\n  `subject`,\n  `body`\n)'],
				listRule: '@request.auth.type = "agent"',
				viewRule: '@request.auth.type = "agent"',
				createRule: '',
				updateRule: '',
				deleteRule: '',
				options: {}
			},
			{
				id: '60k1z3y4mg2q2en',
				created: '2023-08-04 15:20:51.449Z',
				updated: '2023-08-16 11:13:26.745Z',
				name: 'replies_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'bpamjnu9',
						name: 'private',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'c7hkca1w',
						name: 'body',
						type: 'text',
						required: true,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'bwjsbcbh',
						name: 'createdBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'dzsjaciq',
						name: 'ticket',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'fmwr7ccs',
						name: 'reply',
						type: 'relation',
						required: true,
						unique: false,
						options: {
							collectionId: '0sgkselqp3o3cly',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					},
					{
						system: false,
						id: 'zka4wojp',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.type = "agent"',
				viewRule: '@request.auth.type = "agent"',
				createRule: null,
				updateRule: null,
				deleteRule: null,
				options: {}
			},
			{
				id: '_pb_users_auth_',
				created: '2023-08-13 15:43:17.277Z',
				updated: '2023-08-13 15:43:17.280Z',
				name: 'users',
				type: 'auth',
				system: false,
				schema: [
					{
						system: false,
						id: 'users_name',
						name: 'name',
						type: 'text',
						required: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'users_avatar',
						name: 'avatar',
						type: 'file',
						required: false,
						unique: false,
						options: {
							maxSelect: 1,
							maxSize: 5242880,
							mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
							thumbs: null,
							protected: false
						}
					},
					{
						system: false,
						id: 'z6aerqau',
						name: 'type',
						type: 'select',
						required: true,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['user', 'agent']
						}
					}
				],
				indexes: [],
				listRule: 'id = @request.auth.id||type = "agent"||@request.auth.type = "agent"',
				viewRule: 'id = @request.auth.id||type = "agent"||@request.auth.type = "agent"',
				createRule: '@request.data.type = "user"||@request.auth.type = "agent"',
				updateRule:
					'(id = @request.auth.id&&(@request.data.type = type|| @request.data.type=null))||@request.auth.type = "agent"',
				deleteRule: '@request.auth.type = "agent"',
				options: {
					allowEmailAuth: true,
					allowOAuth2Auth: true,
					allowUsernameAuth: true,
					exceptEmailDomains: null,
					manageRule: '@request.auth.type = "agent"',
					minPasswordLength: 8,
					onlyEmailDomains: null,
					requireEmail: true
				}
			}
		];

		const collections = snapshot.map((item) => new Collection(item));

		return Dao(db).importCollections(collections, true, null);
	}
);

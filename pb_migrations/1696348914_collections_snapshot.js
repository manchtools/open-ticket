/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const snapshot = [
			{
				id: '79ttfu5qeuc85nj',
				created: '2023-08-03 15:31:13.761Z',
				updated: '2023-09-17 09:47:52.905Z',
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'cus5pia0',
						name: 'status',
						type: 'select',
						required: true,
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						id: '4ta3mhht',
						name: 'attachments',
						type: 'file',
						required: false,
						presentable: false,
						unique: false,
						options: {
							maxSelect: 20,
							maxSize: 150000000,
							mimeTypes: [],
							thumbs: [],
							protected: true
						}
					}
				],
				indexes: [],
				listRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"))',
				viewRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"))',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.id!=""&&(@request.auth.type = "agent"||@request.auth.type = "limited_agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0))',
				deleteRule: '',
				options: {}
			},
			{
				id: '0sgkselqp3o3cly',
				created: '2023-08-03 15:32:32.084Z',
				updated: '2023-09-16 09:55:12.560Z',
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
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: '4bobug9c',
						name: 'body',
						type: 'text',
						required: true,
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						id: 'ycopfoct',
						name: 'attachments',
						type: 'file',
						required: false,
						presentable: false,
						unique: false,
						options: {
							maxSelect: 5,
							maxSize: 150000000,
							mimeTypes: [],
							thumbs: [],
							protected: true
						}
					}
				],
				indexes: [],
				listRule:
					'@request.auth.id != ""&&((@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent")',
				viewRule:
					'@request.auth.id != ""&&((@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent")',
				createRule:
					'@request.auth.id != ""&&(@request.auth.id = ticket.createdBy.id||@request.auth.type = "agent")',
				updateRule: '@request.auth.id != ""&&(@request.auth.type = "agent")',
				deleteRule: null,
				options: {}
			},
			{
				id: '60k1z3y4mg2q2en',
				created: '2023-08-04 15:20:51.449Z',
				updated: '2023-09-16 09:55:12.560Z',
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
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'c7hkca1w',
						name: 'body',
						type: 'text',
						required: true,
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
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
				id: 'arajxvnubpek5cz',
				created: '2023-08-20 12:56:59.195Z',
				updated: '2023-09-16 09:55:12.560Z',
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
						presentable: false,
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
						presentable: false,
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
				id: '06m7vg95b7ldr3f',
				created: '2023-09-01 15:26:00.014Z',
				updated: '2023-09-16 10:07:03.057Z',
				name: 'tickets_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'qveyoy2k',
						name: 'subject',
						type: 'text',
						required: false,
						presentable: false,
						unique: false,
						options: {
							min: null,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: '8l80gctt',
						name: 'body',
						type: 'text',
						required: true,
						presentable: false,
						unique: false,
						options: {
							min: 1,
							max: null,
							pattern: ''
						}
					},
					{
						system: false,
						id: 'ldjdewem',
						name: 'deleted',
						type: 'bool',
						required: false,
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'wuemkayp',
						name: 'status',
						type: 'select',
						required: true,
						presentable: false,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['open', 'closed', 'pending', 'resolved', 'new', 'in progress']
						}
					},
					{
						system: false,
						id: '19fguhqf',
						name: 'agent',
						type: 'relation',
						required: false,
						presentable: false,
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
						id: 'cetsn0jq',
						name: 'createdBy',
						type: 'relation',
						required: false,
						presentable: false,
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
						id: 'rh0s6luo',
						name: 'replies',
						type: 'relation',
						required: false,
						presentable: false,
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
						id: 'hozcq5ui',
						name: 'updatedBy',
						type: 'relation',
						required: false,
						presentable: false,
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
						id: '8yubbfx9',
						name: 'queue',
						type: 'relation',
						required: false,
						presentable: false,
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
						id: '7fnnu4eh',
						name: 'ticket',
						type: 'relation',
						required: false,
						presentable: false,
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
				indexes: ['CREATE INDEX `idx_Fr38Tq1` ON `tickets_versions` (\n  `subject`,\n  `body`\n)'],
				listRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				viewRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.id!=""&&(@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0))',
				deleteRule: '',
				options: {}
			},
			{
				id: '_pb_users_auth_',
				created: '2023-09-16 09:55:12.539Z',
				updated: '2023-10-03 15:04:06.166Z',
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
						presentable: false,
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
						presentable: false,
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
						presentable: false,
						unique: false,
						options: {
							maxSelect: 1,
							values: ['user', 'agent', 'limited_agent']
						}
					},
					{
						system: false,
						id: 'mtxt2cwx',
						name: 'notificationPrefs',
						type: 'json',
						required: false,
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: '2vvditsj',
						name: 'pushSubscriptions',
						type: 'relation',
						required: false,
						presentable: false,
						unique: false,
						options: {
							collectionId: 'lsd51js6p7yf2aj',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: null
						}
					},
					{
						system: false,
						id: '5z6otg1g',
						name: 'setupSteps',
						type: 'json',
						required: false,
						presentable: false,
						unique: false,
						options: {}
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
				id: 'kjdplb060cskvdd',
				created: '2023-09-16 09:59:25.977Z',
				updated: '2023-09-16 10:03:23.228Z',
				name: 'notifications',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'ukguwkfp',
						name: 'payload',
						type: 'json',
						required: false,
						presentable: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'jmcwajk0',
						name: 'recipients',
						type: 'relation',
						required: false,
						presentable: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: null,
							displayFields: null
						}
					}
				],
				indexes: [],
				listRule: '@request.auth.id != "" && @request.auth.id ?= recipients.id',
				viewRule: '@request.auth.id != "" && @request.auth.id ?= recipients.id',
				createRule: null,
				updateRule: null,
				deleteRule: null,
				options: {}
			},
			{
				id: 'lsd51js6p7yf2aj',
				created: '2023-09-17 19:36:56.331Z',
				updated: '2023-10-01 10:02:03.849Z',
				name: 'pushSubscriptions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'nqu1wvxy',
						name: 'user',
						type: 'relation',
						required: true,
						presentable: false,
						unique: false,
						options: {
							collectionId: '_pb_users_auth_',
							cascadeDelete: true,
							minSelect: null,
							maxSelect: 1,
							displayFields: null
						}
					},
					{
						system: false,
						id: 'pncrsann',
						name: 'subscription',
						type: 'json',
						required: true,
						presentable: false,
						unique: false,
						options: {}
					}
				],
				indexes: [],
				listRule: '@request.auth.id = user.id',
				viewRule: '@request.auth.id = user.id',
				createRule: '@request.auth.id != ""',
				updateRule: null,
				deleteRule: '@request.auth.id = user.id',
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
				updated: '2023-09-03 13:04:11.448Z',
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
					},
					{
						system: false,
						id: '4ta3mhht',
						name: 'attachments',
						type: 'file',
						required: false,
						unique: false,
						options: {
							maxSelect: 20,
							maxSize: 150000000,
							mimeTypes: [],
							thumbs: [],
							protected: true
						}
					}
				],
				indexes: [],
				listRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				viewRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.id!=""&&(@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0))',
				deleteRule: '',
				options: {}
			},
			{
				id: '0sgkselqp3o3cly',
				created: '2023-08-03 15:32:32.084Z',
				updated: '2023-09-03 13:33:49.472Z',
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
					},
					{
						system: false,
						id: 'ycopfoct',
						name: 'attachments',
						type: 'file',
						required: false,
						unique: false,
						options: {
							maxSelect: 5,
							maxSize: 150000000,
							mimeTypes: [],
							thumbs: [],
							protected: true
						}
					}
				],
				indexes: [],
				listRule:
					'@request.auth.id != ""&&((@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent")',
				viewRule:
					'@request.auth.id != ""&&((@request.auth.id = ticket.createdBy.id&&private=false)||@request.auth.type = "agent")',
				createRule:
					'@request.auth.id != ""&&(@request.auth.id = ticket.createdBy.id||@request.auth.type = "agent")',
				updateRule: '@request.auth.id != ""&&(@request.auth.type = "agent")',
				deleteRule: null,
				options: {}
			},
			{
				id: '60k1z3y4mg2q2en',
				created: '2023-08-04 15:20:51.449Z',
				updated: '2023-09-01 16:05:24.417Z',
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
				updated: '2023-09-01 16:05:24.417Z',
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
				updated: '2023-09-01 16:05:24.417Z',
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
				id: '06m7vg95b7ldr3f',
				created: '2023-09-01 15:26:00.014Z',
				updated: '2023-09-01 15:27:13.901Z',
				name: 'tickets_versions',
				type: 'base',
				system: false,
				schema: [
					{
						system: false,
						id: 'qveyoy2k',
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
						id: '8l80gctt',
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
						id: 'ldjdewem',
						name: 'deleted',
						type: 'bool',
						required: false,
						unique: false,
						options: {}
					},
					{
						system: false,
						id: 'wuemkayp',
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
						id: '19fguhqf',
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
						id: 'cetsn0jq',
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
						id: 'rh0s6luo',
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
						id: 'hozcq5ui',
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
						id: '8yubbfx9',
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
						id: '7fnnu4eh',
						name: 'ticket',
						type: 'relation',
						required: false,
						unique: false,
						options: {
							collectionId: '79ttfu5qeuc85nj',
							cascadeDelete: false,
							minSelect: null,
							maxSelect: 1,
							displayFields: []
						}
					}
				],
				indexes: ['CREATE INDEX `idx_Fr38Tq1` ON `tickets_versions` (\n  `subject`,\n  `body`\n)'],
				listRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				viewRule:
					'@request.auth.id!=""&&(@request.auth.id = createdBy.id||@request.auth.id ?= queue.members.id||(@request.auth.type="agent"&&queue=null))',
				createRule: '@request.auth.id != ""',
				updateRule:
					'@request.auth.id!=""&&(@request.auth.type = "agent"||(@request.auth.id = createdBy.id&&@request.data.replies:length>0))',
				deleteRule: '',
				options: {}
			}
		];

		const collections = snapshot.map((item) => new Collection(item));

		return Dao(db).importCollections(collections, true, null);
	}
);

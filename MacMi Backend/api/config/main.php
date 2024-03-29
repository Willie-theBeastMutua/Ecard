<?php

$params = array_merge(
	require(__DIR__ . '/../../common/config/params.php'),
	require(__DIR__ . '/../../common/config/params-local.php'),
	require(__DIR__ . '/params.php'),
	require(__DIR__ . '/params-local.php')
);

return [
	'id' => 'app-api',
	'basePath' => dirname(__DIR__),
	'bootstrap' => ['log'],
	'modules' => [
		'v1' => [
			'basePath' => '@app/modules/v1',
			'class' => 'api\modules\v1\Module'
		]
	],
	'components' => [
		'formatter' => [
			'class' => 'yii\i18n\Formatter',
			'timeZone' => 'Africa/Nairobi'
		],
		'user' => [
			'identityClass' => 'common\models\Profile',
			'enableAutoLogin' => false,
		],
		'log' => [
			'traceLevel' => YII_DEBUG ? 3 : 0,
			'targets' => [
					[
						'class' => 'yii\log\FileTarget',
						'levels' => ['error', 'warning'],
					],
			],
		],
		'response' => [
			'format' => yii\web\Response::FORMAT_JSON
		],
		'request' => [
			// Set Parser to JsonParser to accept Json in request
			'parsers' => [
				'application/json'  => 'yii\web\JsonParser',
			],
			'enableCookieValidation' => true,
			'enableCsrfValidation' => true,
			'cookieValidationKey' => 'TheWestCrater',
		],
		'urlManager' => [
			'enablePrettyUrl' => true,
			'enableStrictParsing' => false,
			'showScriptName' => false,
			'rules' => [
				[
					'class' => 'yii\rest\UrlRule',
					'controller' => [
                        'v1/users', 'v1/feedback-status', 'v1/timesheets', 'v1/timesheet-activities', 'v1/support'
                    ],
				]
			],
		]
	],
	'params' => $params,
];

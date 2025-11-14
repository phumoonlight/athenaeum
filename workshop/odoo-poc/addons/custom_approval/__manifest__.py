{
    "name": "CUSTOM APPROVAL",
    'version': '0.0.1',
    'category': 'Custom/Approvals',
    "summary": "SUMMARY HERE",
    "description": """
        DESC HERE
    """,
    "author": "PUMON",
    "depends": ["approvals"],
    "data": [
        "views/calendar.xml",
    ],
    "assets": {
        'web.assets_common': [
            'approval_custom/static/src/common.js',
        ],
        "web.assets_backend": [
            "approval_custom/static/src/main.js",
        ],
        "web.assets_frontend": [
            "approval_custom/static/src/fe.js",
        ],
    },
    "auto_install": True,
    "installable": True
}
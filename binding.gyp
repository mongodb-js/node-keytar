{
  'targets': [
    {
      'target_name': 'keytar',
      'include_dirs': [ '<!(node -e "require(\'nan\')")' ],
      'sources': [
        'src/main.cc',
        'src/keytar.h',
      ],
      'conditions': [
        ['OS=="mac"', {
          'sources': [
            'src/keytar_mac.cc',
          ],
          'link_settings': {
            'libraries': [
              '$(SDKROOT)/System/Library/Frameworks/AppKit.framework',
            ],
          },
        }],
        ['OS=="win"', {
          'sources': [
            'src/keytar_win.cc',
          ],
          'msvs_disabled_warnings': [
            4267,  # conversion from 'size_t' to 'int', possible loss of data
            4530,  # C++ exception handler used, but unwind semantics are not enabled
            4506,  # no definition for inline function
          ],
        }],
        ['OS=="linux"', {
          'sources': [
            'src/keytar_posix.cc'
          ],
          'libraries': [
            '-lsecret-1',
            '-lgio-2.0',
            '-lgobject-2.0',
            '-lglib-2.0',
          ],
          'cflags': [
            '-Wno-missing-field-initializers',
            '-Wno-deprecated-declarations',
          ],
        }],
      ],
    }
  ]
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Assets4 {

    string constant public FACE_SHAPE_2 = 
        '<g>'
            '<path d="M248.1 332.101C246.3 333.101 245.1 334.901 245 336.901C245 337.401 245 337.901 245 338.501C245 362.401 269.6 381.801 300 381.801C330.4 381.801 355 362.401 355 338.501C355 337.801 355 337.201 354.9 336.501C354.8 334.401 353.6 332.601 351.8 331.601C305.8 306.901 266 322.201 248.1 332.101Z" fill="#FF4040"/>'
            '<path d="M300 346.8C318.1 346.8 334.2 353.7 344.2 364.3C351 357.1 355 348.2 355 338.5C355 337.8 355 337.2 354.9 336.5C354.8 334.4 353.5 332.7 351.8 331.6C303.1 301.6 269 319.7 248 332C246.2 333 245 334.8 244.9 336.8C244.9 337.3 244.9 337.8 244.9 338.4C244.9 348.1 248.9 357 255.7 364.2C265.8 353.7 281.9 346.8 300 346.8Z" fill="black"/>'
            '<path d="M203.6 227.5C207.7 228.2 215.6 230 223.7 234.2C224 234.4 223.9 234.9 223.5 234.8C221.9 234.6 220.4 234.5 218.7 234.6C202.9 235.1 190.8 248.6 191.6 264.4C192.4 279.3 205 291 220 290.9C235.9 290.7 248.4 277.5 247.7 261.8C247.7 261.8 247.9 224 203.5 227C203.2 226.8 203.2 227.4 203.6 227.5Z" fill="black"/>'
            '<path d="M227.7 247.2L230.8 252.5L236.8 253.9C238 254.2 238.5 255.6 237.6 256.5L233.6 261.1L234.2 267.2C234.3 268.5 233 269.3 232 268.9L226.4 266.5L220.8 268.9C219.6 269.4 218.4 268.5 218.6 267.2L219.2 261.1L215.2 256.5C214.4 255.5 214.9 254.1 216 253.9L222 252.5L225.1 247.2C225.4 246.1 227 246.1 227.7 247.2Z" fill="white"/>'
            '<path d="M364.1 229.099C368.2 229.799 376.1 231.599 384.2 235.799C384.5 235.999 384.4 236.499 384 236.399C382.4 236.199 380.9 236.099 379.2 236.199C363.4 236.699 351.3 250.199 352.1 265.999C352.9 280.899 365.5 292.599 380.5 292.499C396.4 292.299 408.9 279.099 408.2 263.399C408.2 263.399 408.4 225.599 364 228.599C363.8 228.499 363.7 229.099 364.1 229.099Z" fill="black"/>'
            '<path d="M388.1 248.9L391.2 254.2L397.2 255.6C398.4 255.9 398.9 257.3 398 258.2L394 262.8L394.6 268.9C394.7 270.2 393.4 271 392.4 270.6L386.8 268.2L381.2 270.6C380 271.1 378.8 270.2 379 268.9L379.6 262.8L375.6 258.2C374.8 257.2 375.3 255.8 376.4 255.6L382.4 254.2L385.5 248.9C386 247.7 387.5 247.7 388.1 248.9Z" fill="white"/>'
        '</g>';

    string constant public FACE_SHAPE_3 = 
        '<g>'
            '<path d="M226.072 350.961H373.928C381.655 350.961 385.253 343.552 379.432 339.636C352.972 321.855 292.856 293.914 220.78 339.53C214.747 343.447 218.24 350.961 226.072 350.961Z" fill="black"/>'
            '<path d="M256.447 260.469C256.447 260.469 251.367 243.641 213.9 250.943C213.9 250.943 176.433 257.717 177.915 278.462C177.915 278.462 178.762 299.1 218.24 289.68C218.24 289.68 264.809 278.885 256.447 260.469Z" fill="black"/>'
            '<path d="M220.356 258.881L221.626 262.268L225.013 263.538C227.448 264.491 227.448 267.878 225.013 268.83L221.626 270.1L220.356 273.487C219.404 275.921 216.017 275.921 215.064 273.487L213.794 270.1L210.407 268.83C207.973 267.878 207.973 264.491 210.407 263.538L213.794 262.268L215.064 258.881C216.017 256.447 219.404 256.447 220.356 258.881Z" fill="white"/>'
            '<path d="M343.553 260.469C343.553 260.469 348.633 243.641 386.1 250.943C386.1 250.943 423.567 257.717 422.085 278.462C422.085 278.462 421.238 299.1 381.76 289.68C381.76 289.68 335.191 278.885 343.553 260.469Z" fill="black"/>'
            '<path d="M379.644 258.881L378.374 262.268L374.987 263.538C372.552 264.491 372.552 267.878 374.987 268.83L378.374 270.1L379.644 273.487C380.596 275.921 383.983 275.921 384.936 273.487L386.206 270.1L389.593 268.83C392.027 267.878 392.027 264.491 389.593 263.538L386.206 262.268L384.936 258.881C384.089 256.447 380.596 256.447 379.644 258.881Z" fill="white"/>'
        '</g>';

    string constant public FACE_SHAPE_4 = 
        '<g>'
            '<path d="M302.717 418.487C319.786 418.487 333.622 397.779 333.622 372.235C333.622 346.691 319.786 325.984 302.717 325.984C285.649 325.984 271.812 346.691 271.812 372.235C271.812 397.779 285.649 418.487 302.717 418.487Z" fill="black"/>'
            '<path d="M259.206 270.06C273.456 238.846 270.782 207.048 253.235 199.037C235.687 191.026 209.91 209.836 195.66 241.049C181.41 272.263 184.084 304.061 201.632 312.072C219.179 320.083 244.956 301.273 259.206 270.06Z" fill="black"/>'
            '<path d="M239.531 214.747L241.754 225.649C242.601 229.882 245.353 233.587 249.269 235.597L255.619 238.878C256.36 239.302 256.36 240.36 255.619 240.784L249.269 244.065C245.353 246.076 242.601 249.674 241.754 254.013L239.531 264.915C239.32 266.079 237.626 266.079 237.415 264.915L235.192 254.013C234.345 249.78 231.594 246.076 227.678 244.065L221.327 240.784C220.586 240.36 220.586 239.302 221.327 238.878L227.678 235.597C231.594 233.587 234.345 229.988 235.192 225.649L237.415 214.747C237.732 213.583 239.32 213.583 239.531 214.747Z" fill="white"/>'
            '<path d="M207.039 290.528C210.312 290.528 212.966 287.874 212.966 284.601C212.966 281.327 210.312 278.674 207.039 278.674C203.766 278.674 201.112 281.327 201.112 284.601C201.112 287.874 203.766 290.528 207.039 290.528Z" fill="white"/>'
            '<path d="M398.368 312.117C415.916 304.106 418.59 272.308 404.34 241.095C390.09 209.881 364.313 191.072 346.766 199.083C329.218 207.093 326.544 238.891 340.794 270.105C355.044 301.318 380.821 320.128 398.368 312.117Z" fill="black"/>'
            '<path d="M360.399 214.747L358.177 225.649C357.33 229.882 354.578 233.587 350.662 235.597L344.312 238.878C343.571 239.302 343.571 240.36 344.312 240.784L350.662 244.065C354.578 246.076 357.33 249.674 358.177 254.013L360.399 264.915C360.611 266.079 362.304 266.079 362.516 264.915L364.739 254.013C365.585 249.78 368.337 246.076 372.253 244.065L378.604 240.784C379.344 240.36 379.344 239.302 378.604 238.878L372.253 235.597C368.337 233.587 365.585 229.988 364.739 225.649L362.516 214.747C362.199 213.583 360.611 213.583 360.399 214.747Z" fill="white"/>'
            '<path d="M392.892 290.528C396.165 290.528 398.819 287.874 398.819 284.601C398.819 281.327 396.165 278.674 392.892 278.674C389.618 278.674 386.965 281.327 386.965 284.601C386.965 287.874 389.618 290.528 392.892 290.528Z" fill="white"/>'
        '</g>';

    string constant public FACE_SHAPE_5 = 
        '<g>'
            '<path d="M210.937 322.914C237.884 322.914 259.728 301.07 259.728 274.123C259.728 247.176 237.884 225.331 210.937 225.331C183.99 225.331 162.145 247.176 162.145 274.123C162.145 301.07 183.99 322.914 210.937 322.914Z" fill="black"/>'
            '<path d="M235.915 252.214L236.655 256.236C237.82 262.163 241.947 267.032 247.663 268.937L248.827 269.36C249.144 269.466 249.144 269.889 248.827 269.995L247.663 270.418C241.947 272.323 237.82 277.192 236.655 283.119L235.915 287.141C235.809 287.564 235.28 287.564 235.28 287.141L234.539 283.119C233.374 277.192 229.247 272.323 223.531 270.418L222.367 269.995C222.05 269.889 222.05 269.466 222.367 269.36L223.531 268.937C229.247 267.032 233.374 262.163 234.539 256.236L235.28 252.214C235.28 251.791 235.809 251.791 235.915 252.214Z" fill="white"/>'
            '<path d="M195.273 266.079C201.585 266.079 206.703 260.961 206.703 254.648C206.703 248.335 201.585 243.218 195.273 243.218C188.96 243.218 183.842 248.335 183.842 254.648C183.842 260.961 188.96 266.079 195.273 266.079Z" fill="white"/>'
            '<path d="M201.2 307.991C204.473 307.991 207.126 305.338 207.126 302.064C207.126 298.791 204.473 296.137 201.2 296.137C197.926 296.137 195.273 298.791 195.273 302.064C195.273 305.338 197.926 307.991 201.2 307.991Z" fill="white"/>'
            '<path d="M389.063 322.914C416.01 322.914 437.855 301.07 437.855 274.123C437.855 247.176 416.01 225.331 389.063 225.331C362.116 225.331 340.272 247.176 340.272 274.123C340.272 301.07 362.116 322.914 389.063 322.914Z" fill="black"/>'
            '<path d="M414.041 252.214L414.782 256.236C415.946 262.163 420.074 267.032 425.789 268.937L426.954 269.36C427.271 269.466 427.271 269.889 426.954 269.995L425.789 270.418C420.074 272.323 415.946 277.192 414.782 283.119L414.041 287.141C413.935 287.564 413.406 287.564 413.406 287.141L412.665 283.119C411.501 277.192 407.373 272.323 401.658 270.418L400.494 269.995C400.176 269.889 400.176 269.466 400.494 269.36L401.658 268.937C407.373 267.032 411.501 262.163 412.665 256.236L413.406 252.214C413.406 251.791 413.935 251.791 414.041 252.214Z" fill="white"/>'
            '<path d="M373.399 266.079C379.712 266.079 384.83 260.961 384.83 254.648C384.83 248.335 379.712 243.218 373.399 243.218C367.086 243.218 361.969 248.335 361.969 254.648C361.969 260.961 367.086 266.079 373.399 266.079Z" fill="white"/>'
            '<path d="M379.326 307.991C382.6 307.991 385.253 305.338 385.253 302.064C385.253 298.791 382.6 296.137 379.326 296.137C376.053 296.137 373.399 298.791 373.399 302.064C373.399 305.338 376.053 307.991 379.326 307.991Z" fill="white"/>'
            '<path d="M301.535 343.659C291.692 343.659 283.754 357.524 283.754 374.67H319.21C319.316 357.524 311.378 343.659 301.535 343.659Z" fill="black"/>'
        '</g>';

    string constant public FACE_SHAPE_6 = 
        '<g>'
            '<path d="M211.36 301.852C245.73 301.852 273.593 288.916 273.593 272.958C273.593 257.001 245.73 244.064 211.36 244.064C176.99 244.064 149.127 257.001 149.127 272.958C149.127 288.916 176.99 301.852 211.36 301.852Z" fill="black"/>'
            '<path d="M183.63 272.958C183.63 264.491 187.44 256.871 193.473 251.791C172.517 254.86 157.382 263.221 157.382 272.958C157.382 282.696 172.411 291.057 193.473 294.126C187.44 289.046 183.63 281.426 183.63 272.958Z" fill="white"/>'
            '<path d="M229.353 251.791C233.692 255.389 236.761 260.364 238.243 265.973L224.061 272.958L238.243 279.944C236.761 285.553 233.586 290.528 229.353 294.126C250.309 291.057 265.444 282.696 265.444 272.958C265.444 263.221 250.415 254.86 229.353 251.791Z" fill="white"/>'
            '<path d="M388.64 301.852C423.01 301.852 450.873 288.916 450.873 272.958C450.873 257.001 423.01 244.064 388.64 244.064C354.27 244.064 326.407 257.001 326.407 272.958C326.407 288.916 354.27 301.852 388.64 301.852Z" fill="black"/>'
            '<path d="M360.91 272.958C360.91 264.491 364.72 256.871 370.753 251.791C349.797 254.86 334.662 263.221 334.662 272.958C334.662 282.696 349.691 291.057 370.753 294.126C364.72 289.046 360.91 281.426 360.91 272.958Z" fill="white"/>'
            '<path d="M406.633 251.791C410.972 255.389 414.041 260.364 415.523 265.973L401.341 272.958L415.523 279.944C414.041 285.553 410.866 290.528 406.633 294.126C427.589 291.057 442.724 282.696 442.724 272.958C442.618 263.221 427.589 254.86 406.633 251.791Z" fill="white"/>'
            '<path d="M337.308 350.115H262.798V355.936H337.308V350.115Z" fill="black"/>'
        '</g>';

    string constant public FACE_SHAPE_7 = 
        '<g>'
            '<path d="M210.937 283.064C229.759 283.064 245.017 272.165 245.017 258.721C245.017 245.277 229.759 234.378 210.937 234.378C192.115 234.378 176.857 245.277 176.857 258.721C176.857 272.165 192.115 283.064 210.937 283.064Z" fill="black"/>'
            '<path d="M226.072 243.586L228.506 249.936L235.385 250.36C236.126 250.36 236.444 251.418 235.915 251.841L230.623 256.181L232.422 262.849C232.634 263.589 231.787 264.224 231.152 263.801L225.437 260.097L219.721 263.801C219.086 264.224 218.24 263.589 218.451 262.849L220.25 256.181L214.959 251.841C214.323 251.312 214.641 250.36 215.488 250.36L222.367 249.936L224.802 243.586C224.802 242.845 225.754 242.845 226.072 243.586Z" fill="white"/>'
            '<path d="M193.262 273.644C195.658 273.644 197.601 271.701 197.601 269.305C197.601 266.908 195.658 264.965 193.262 264.965C190.865 264.965 188.922 266.908 188.922 269.305C188.922 271.701 190.865 273.644 193.262 273.644Z" fill="white"/>'
            '<path d="M389.063 283.064C407.885 283.064 423.143 272.165 423.143 258.721C423.143 245.277 407.885 234.378 389.063 234.378C370.241 234.378 354.983 245.277 354.983 258.721C354.983 272.165 370.241 283.064 389.063 283.064Z" fill="black"/>'
            '<path d="M404.198 243.586L406.633 249.936L413.512 250.36C414.253 250.36 414.57 251.418 414.041 251.841L408.749 256.181L410.549 262.849C410.76 263.589 409.914 264.224 409.279 263.801L403.563 260.097L397.848 263.801C397.213 264.224 396.366 263.589 396.578 262.849L398.377 256.181L393.085 251.841C392.45 251.312 392.768 250.36 393.614 250.36L400.494 249.936L402.928 243.586C402.928 242.845 403.881 242.845 404.198 243.586Z" fill="white"/>'
            '<path d="M371.388 273.644C373.785 273.644 375.728 271.701 375.728 269.305C375.728 266.908 373.785 264.965 371.388 264.965C368.992 264.965 367.049 266.908 367.049 269.305C367.049 271.701 368.992 273.644 371.388 273.644Z" fill="white"/>'
            '<path d="M353.925 326.987C353.925 322.542 351.596 320.319 350.115 323.071C345.246 332.067 336.144 338.206 325.772 338.206C315.717 338.206 306.932 332.49 301.958 324.023C301.535 322.647 300.794 321.907 300.053 321.907C299.312 321.907 298.571 322.647 298.148 324.023C293.173 332.596 284.389 338.206 274.334 338.206C263.962 338.206 254.86 332.173 249.991 323.071C248.509 320.319 246.181 322.542 246.181 326.987V327.093C246.181 343.921 258.776 357.468 274.334 357.468C276.345 357.468 278.356 357.257 280.261 356.833C280.155 357.892 280.049 358.95 280.049 360.009C280.049 374.085 289.046 385.622 300.053 385.622C311.06 385.622 320.056 374.191 320.056 360.009C320.056 358.95 319.951 357.892 319.845 356.833C321.75 357.257 323.761 357.468 325.772 357.468C341.33 357.574 353.925 343.921 353.925 326.987C353.925 327.093 353.925 327.093 353.925 326.987Z" fill="black"/>'
        '</g>';

    string constant public FACE_SHAPE_8 = 
        '<g>'
            '<path d="M221.521 303.914C248.404 303.914 270.206 282.112 270.206 255.229H172.729C172.729 282.112 194.638 303.914 221.521 303.914Z" fill="black"/>'
            '<path d="M241.101 259.674C241.207 260.626 241.312 261.579 241.312 262.531C241.312 273.433 232.422 282.323 221.521 282.323C210.619 282.323 201.729 273.433 201.729 262.531C201.729 261.579 201.835 260.626 201.94 259.674H178.444C178.444 281.582 199.718 299.363 221.626 299.363C243.535 299.363 264.809 281.582 264.809 259.674H241.101Z" fill="white"/>'
            '<path d="M378.479 303.914C405.363 303.914 427.165 282.112 427.165 255.229H329.688C329.794 282.112 351.596 303.914 378.479 303.914Z" fill="black"/>'
            '<path d="M398.165 259.674C398.271 260.626 398.377 261.579 398.377 262.531C398.377 273.433 389.487 282.323 378.585 282.323C367.684 282.323 358.793 273.433 358.793 262.531C358.793 261.579 358.899 260.626 359.005 259.674H335.509C335.509 281.582 356.782 299.363 378.691 299.363C400.6 299.363 421.873 281.582 421.873 259.674H398.165Z" fill="white"/>'
            '<path d="M262.057 332.914C265.232 351.013 281.002 364.877 299.947 364.877C318.892 364.877 334.768 351.118 337.837 332.914H262.057Z" fill="black"/>'
       '</g>';

}

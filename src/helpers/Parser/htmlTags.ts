const tags = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdo',      'blockquote', 'body',     'br',         'button',
    'canvas',   'caption',    'cite',     'code',       'col',
    'colgroup', 'datalist',   'dd',       'del',        'details',
    'dfn',      'dialog',     'div',      'dl',         'dt',
    'em',       'embed',      'fieldset', 'figcaption', 'figure',
    'footer',   'form',       'h1',       'h2',         'h3',
    'h4',       'h5',         'h6',       'head',       'header',
    'hr',       'html',       'i',        'iframe',     'img',
    'input',    'ins',        'kbd',      'label',      'legend',
    'li',       'link',       'main',     'map',        'mark',
    'menu',     'menuitem',   'meta',     'meter',      'nav',
    'noscript', 'object',     'ol',       'optgroup',   'option',
    'output',   'p',          'param',    'picture',    'pre',
    'progress', 'q',          'rp',       'rt',         'ruby',
    's',        'samp',       'script',   'section',    'select',
    'small',    'source',     'span',     'strong',     'style',
    'sub',      'summary',    'sup',      'table',      'tbody',
    'td',       'textarea',   'tfoot',    'th',         'thead',
    'time',     'title',      'tr',       'track',      'ul',
    'var',      'video',      'wbr'
] ;


export function binsearchKey(tag: string) {
    let left = 0,
        right = tags.length;
    let mid;

    while (right > left) {
        mid = Math.trunc((left + right) / 2);
        if(tags[mid] === tag) {
            return mid;
        } else  {
            if (tags[mid] < tag){
                left = mid + 1;
            } else {
                right = mid;
            }
        }
    }

    return -1;
}
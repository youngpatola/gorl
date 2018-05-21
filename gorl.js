var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

var MATCH = ['Girl', 'Girls', 'girl', 'girls'];

fire(document.body);

function fire(node) {
	var child, next;
	switch (node.nodeType) {
		case ELEMENT:
        case DOCUMENT:
        case DOCUMENT_FRAGMENT:
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                fire(child);
                child = next;
            }
            break;

        case TEXT:
            subText(node);
            break;
	}
}

function subText(textNode) {
	var text = textNode.nodeValue;
    text = text.replace(new RegExp('\\b' + 'Girl' + '\\b', 'g'), 'Gorl');
    text = text.replace(new RegExp('\\b' + 'Girls' + '\\b', 'g'), 'Gorls');
    text = text.replace(new RegExp('\\b' + 'girls' + '\\b', 'g'), 'gorls');
    text = text.replace(new RegExp('\\b' + 'girl' + '\\b', 'g'), 'gorl');
	text = text.replace(new RegExp('\\b' + 'Supergirl' + '\\b', 'g'), 'Supergorl');
    
    textNode.nodeValue = text;
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        subText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
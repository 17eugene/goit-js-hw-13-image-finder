import refs from "./refs";

export default class LoadMore {
    constructor({ selector, hidden = false, }) {
        this.refs = this.getRefs(selector);

    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.load-more-btn-label');

        return refs;
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = 'Show more';
    }

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Loading...'
    }
}
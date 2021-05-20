function getTitle (vm) {
    const { title } = vm.$options;

    if (title) {
        return typeof title === 'function' ? title.call(vm) : title;
    }
}

export default {
    created () {
        const title = getTitle(this)

        if (title === 'GainGem') {
            document.title = 'GainGem';
        } else if (title) {
            document.title = title + ' - GainGem';
        }
    }
}
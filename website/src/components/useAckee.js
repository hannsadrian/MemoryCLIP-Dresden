const { useRef, useEffect } = require('react');
const ackeeTracker = require('ackee-tracker');

/**
 * Use Ackee in React.
 * Creates an instance once and a new record every time the pathname changes.
 * @param {?String} pathname - Current path.
 * @param {Object} server - Server details.
 * @param {?Object} opts - Ackee options.
 */
export default function(pathname, server, opts = {}) {

    const instanceRef = useRef();

    useEffect(() => {

        instanceRef.current = ackeeTracker.create(server, opts)

    }, []);

    useEffect(() => {

        const hasPathname = (
            pathname != null &&
            pathname !== ''
        );

        if (hasPathname === false) return;

        const attributes = ackeeTracker.attributes(opts.detailed);

        // eslint-disable-next-line no-restricted-globals
        const url = new URL(pathname, location);

        if (attributes.siteReferrer !== null && (attributes.siteReferrer.includes(process.env.REACT_APP_ACKEE_URL) || attributes.siteReferrer.includes(process.env.REACT_APP_ACKEE_IGNORE))
            return;

        if (url.href.includes(process.env.REACT_APP_ACKEE_IGNORE))
            return;

        instanceRef.current.record({
            ...attributes,
            siteLocation: url.href
        })

    }, [ pathname ])

}
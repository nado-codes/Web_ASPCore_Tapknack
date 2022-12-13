export const PageHelpers = () => {
  const exitTimeout = 500;

  const getHrefNoHash = () => {
    const {
      location: { href: locationHref },
    } = window;

    return locationHref.substring(0, locationHref.indexOf("/#"));
  };

  const GotoUrl = (url) => {
    const hrefNoHash = getHrefNoHash();

    localStorage.prevPage = hrefNoHash;

    window.location = `${hrefNoHash}/#exit`;
    setTimeout(() => (window.location = `${url}/#enter`), exitTimeout);
  };

  const ReturnToPrevUrl = () => {
    const hrefNoHash = getHrefNoHash();

    window.location = `${localStorage.prevPage}/#return`;
    localStorage.prevPage = hrefNoHash;
  };

  return { GotoUrl, ReturnToPrevUrl };
};

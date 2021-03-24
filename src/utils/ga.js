export default function ga(id) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${id}`);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', id);
}

export class AppPackageLoader {
  public route;
  public subPackage;

  constructor (route, subPackage) {
    this.route = route;
    this.subPackage = subPackage;
  }

  serviceLoader () {
    const src = `/subpage/appservice?p=${this.subPackage.root}&r=${this.route}`;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
  
      script.type = 'application/javascript';
      script.src = src;
  
      script.onload = () => {
        resolve(src);
      }
      script.onerror = (error) => {
        reject(error);
      }
  
      script.src = src;
  
      document.head.appendChild(script);
    });
  }

  injectAppServiceContext () {
    return this.appServiceLoader();
  }

}
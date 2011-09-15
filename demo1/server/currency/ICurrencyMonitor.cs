using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace TN.ApplicationServer.Samples.Currency
{
    using WebEnabledComponentContractAttribute = ApplicationServer.ComponentModel.Web.WebEnabledComponentContractAttribute;

    [ServiceContract(Name = "ICurrencyMonitor", Namespace = "http://tnaps.tncor.com/samples")]
    [WebEnabledComponentContract]
    interface ICurrencyMonitor
    {
        [OperationContract(Name = "EuroDollarQuote")]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/eur-usd.json")]
        decimal EuroDollarQuote();
    }
}

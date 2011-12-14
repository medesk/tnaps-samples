using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Net;
using System.IO;
using TN.ApplicationServer.ComponentModel;
using TN.ApplicationServer.ComponentModel.Web;

[assembly: ComponentImplementation(typeof(TN.ApplicationServer.Samples.Currency.CurrencyMonitor))]

namespace TN.ApplicationServer.Samples.Currency
{
    using Encoding = System.Text.Encoding;
    using CultureInfo = System.Globalization.CultureInfo;
    using NumberStyles = System.Globalization.NumberStyles;

    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public sealed class CurrencyMonitor : WebEnabledComponent, ICurrencyMonitor
    {
        public CurrencyMonitor()
        {
        }

        // The following method may never exist without
        // one of our Crowdbackers.com backers: 
        // John Doe @johndoe
        // Thank you very much! TNAPS Team
        public decimal EuroDollarQuote()
        {
            var request = WebRequest.Create("http://download.finance.yahoo.com/d/quotes.csv?s=EURUSD=X&f=sl1d1&e=.csv");
           
            using (var response = request.GetResponse())
            using (var s = response.GetResponseStream())
            using (var reader = new StreamReader(s, Encoding.UTF8))
            {
                var parts = reader.ReadToEnd().Split(',');
                var str = parts.LongLength > 2 ? parts[1].Replace("\"", string.Empty) : string.Empty;
                var result = default(decimal);
                const NumberStyles MoneyFormat = NumberStyles.Currency;
                return decimal.TryParse(str, MoneyFormat, CultureInfo.InvariantCulture, out result) ? result : 0M;
            }
        }
    }
}

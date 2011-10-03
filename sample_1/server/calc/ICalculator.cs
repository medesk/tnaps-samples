using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace TN.ApplicationServer.Samples.Calculator
{
    using WebEnabledComponentContractAttribute = ApplicationServer.ComponentModel.Web.WebEnabledComponentContractAttribute;

    [ServiceContract(Name = "ICalculator", Namespace = "http://tnaps.tncor.com/samples")]
    [WebEnabledComponentContract]
    interface ICalculator
    {
        [OperationContract(Name = "IntToBin")]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/int_to_bin.json?value={value}")]
        string ToBinary(int value);

        [OperationContract(Name = "BinToInt")]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/bin_to_int.json?value={value}")]
        int FromBinary(string value);
    }
}

using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace TN.ApplicationServer.Samples.Calculator
{
    using WebEnabledComponentContractAttribute = ApplicationServer.ComponentModel.Web.WebEnabledComponentContractAttribute;

    /// <summary>
    /// Represents interface of the component that describes its functionality.
    /// The metadata can be used by another components to call into this component.
    /// </summary>
    [ServiceContract(Name = "ICalculator", Namespace = "http://tnaps.tncor.com/samples")]   //Declare component interface like WCF contract!
    [WebEnabledComponentContract]   //TNAPS trick that enables REST infrastructure for this component
    interface ICalculator
    {
        [OperationContract(Name = "IntToBin")]  //..and component operation like WCF operation!
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/int_to_bin.json?value={value}")]
        string ToBinary(int value);

        [OperationContract(Name = "BinToInt")]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/bin_to_int.json?value={value}")]
        int FromBinary(string value);
    }
}

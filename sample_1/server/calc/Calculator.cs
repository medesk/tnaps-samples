using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using TN.ApplicationServer.ComponentModel;
using TN.ApplicationServer.ComponentModel.Web;

[assembly: ComponentImplementation(typeof(TN.ApplicationServer.Samples.Calculator.Calculator))]

namespace TN.ApplicationServer.Samples.Calculator
{
    /// <summary>
    /// Represents simple INT/BIn converter.
    /// This class cannot be inherited.
    /// </summary>
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]    //Again WCF-style programming!
    public sealed class Calculator: WebEnabledComponent, ICalculator
    {
        /// <summary>
        /// Initializes a new instance of the component.
        /// </summary>
        public Calculator()
        {
        }

        /// <summary>
        /// Converts integer to its binary representation.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public string ToBinary(int value)
        {
            return Convert.ToString(value, 2);
        }

        /// <summary>
        /// Returns an integer value parsed from the its binary representation.
        /// </summary>
        /// <param name="bin"></param>
        /// <returns></returns>
        public int FromBinary(string bin)
        {
            return Convert.ToInt32(bin, 2);
        }
    }
}

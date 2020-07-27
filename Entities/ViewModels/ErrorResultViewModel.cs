using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels {
    public class ErrorResultViewModel {
        public string message { get; set; }
        public List<string> details { get; set; }
    }
}

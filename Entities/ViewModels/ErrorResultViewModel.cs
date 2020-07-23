using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.ViewModels {
    public class ErrorResultViewModel {
        public string error { get; set; }
        public List<string> detail { get; set; }
    }
}

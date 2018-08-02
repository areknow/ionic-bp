// ============================================================================
// Date sorting pipe
// ============================================================================

// Angular
import { Pipe, PipeTransform } from '@angular/core';

// ----------------------------------------------------------------------------
// Class
// ----------------------------------------------------------------------------
@Pipe({
  name: 'dateSort'
})

export class dateSortPipe implements PipeTransform {
  transform(value) {
    // Skip return if data hasnt hit template yet
    if (!value) return;
    // Sort by date
    let val = value.sort((a: any, b: any) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else {
        return 0;
      }
    });
    // Return sorted value
    return val;
  }
}
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '.././services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
})
export class CreatePollComponent {
  poll = {
    question: '',
    options: ['', ''], // Start with 2 options
  };

   error: string = '';
  constructor(private http: HttpClient,private apiService: ApiService, private router: Router , private toastr: ToastrService) {}

  addOption() {
    if (this.poll.options.length < 10) {
      this.poll.options.push('');
    }
  }

  removeOption(index: number) {
    if (this.poll.options.length > 2) {
      this.poll.options.splice(index, 1);
    }
  }

  submitPoll() {
    const trimmedOptions = this.poll.options.filter(opt => opt.trim() !== '');

    // if (!this.poll.question.trim() || trimmedOptions.length < 1) {
    //   alert('Please enter a question and at least two options.');
    //   return;
    // }

    const payload = {
      question: this.poll.question.trim(),
      options: trimmedOptions,
    };

    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     
    this.http.post('https://localhost:7022/api/Poll/create', payload ).subscribe({
      next: () => {
         this.toastr.success('Poll created successfully');
        this.router.navigate(['/polls']); // or any desired route
      },
      error: (err) => {
        if (err.status === 401) {
          
     
        
           this.toastr.error('Unauthorized. Please log in again.');
          
        } else {
          this.toastr.error('Failed to create poll.');
        }
      },
    });

//     this.apiService.post('/Poll/create', payload, 'Poll created successfully' , 'Failed to create poll.').subscribe({
//   next: () => {
//       // this.toastr.success('Poll created successfully');
//     this.router.navigate(['/dashboard']);
//   },
//   error: (err) => {
//     // No need to do alert or error handling here
//     // Because ResponseHandlerService already shows toastr error messages
//     // But you can handle additional logic if needed
//     if (err.status === 401) {
//       // maybe do additional handling for unauthorized errors if needed
//       this.error = 'Unauthorized. Please log in again.';
//     } else {
//           this.error = 'Failed to create poll.';
//         }
//   },
// });
  }
}

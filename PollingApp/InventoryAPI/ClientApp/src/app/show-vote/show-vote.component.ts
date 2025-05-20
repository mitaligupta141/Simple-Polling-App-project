import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-vote',

  templateUrl: './show-vote.component.html',
})
export class ShowVoteComponent implements OnInit {
  votes: any[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['question', 'optionText', 'votedAt'];

  ngOnInit(): void {
    this.fetchVotes();
  }

  fetchVotes(): void {


    this.http.get<any>('https://localhost:7022/api/Vote/user-votes').subscribe({
      next: (res) => {
        console.log('API response:', res);
        this.votes = res.data;
      },
      error: (err) => {
        this.error = err.status === 401
          ? 'Unauthorized. Please log in again.'
          : err.error || 'Failed to fetch your votes.';
      },
    });
  }
}

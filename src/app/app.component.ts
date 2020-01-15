import { Component } from '@angular/core';
import { Services } from './service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mentors = [];
  name: string; contact: string; email: string; subject: string;
  tasks = [];
  tasklist = []; taskToggle: Boolean = false;
  mentorFormShow: Boolean = false; editMentor: Boolean = false;
  selectedMentor: any;
  updateMentorDetail: any;
  constructor(private service: Services,
    private toastr: ToastrService
  ) {
    this.addTask();
  }
  ngOnInit() {
    this.getMentors();
  }
  getMentors() {
    this.service.getMentors().subscribe(data => {
      if (data.success) {
        this.mentors = data.mentors;
      }
    }, err => {
      console.log(err)
    })
  }
  add() {
    this.mentorFormShow = true;
    this.editMentor = false;
  }
  addMentor() {
    const data = {
      name: this.name,
      contact: this.contact,
      email: this.email,
      subject: this.subject,
      mentorId: "MNT" + Math.floor(Math.random() * 100000)
    }
    if (data.name) {
      this.service.addMentor(data).subscribe(data => {
        this.name = "";
        this.contact = "";
        this.email = "";
        this.mentors.push(data.mentor);
        console.log(this.mentors)
        this.toastr.success('Mentors Added');
        this.mentorFormShow = false;
      }, err => {
        console.log(err)
      })
    } else {
      this.toastr.info('Please enter name')
    }
  }
  showwUdateMentor(mentor) {
    this.updateMentorDetail = mentor;
    this.mentorFormShow = true;
    this.editMentor = true;
  }
  updateMentor() {
    this.service.updateMentor(this.updateMentorDetail).subscribe(data => {
      this.toastr.success('Updated Successfully')
    }, err => {
      this.toastr.error(err.error.message)
    })
  }
  addMentorTask(mentor) {
    this.selectedMentor = mentor;
    this.taskToggle = true;
  }
  addTask() {
    this.tasks.push({ topic: '', detail: '' });
  }
  deleteTask(index) {
    this.tasks.splice(index, 1)
  }
  submitTask() {
    const data = {
      id: this.selectedMentor._id,
      task: this.tasks
    }
    this.service.addTask(data).subscribe(data => {
      if (data.success) {
        this.toastr.success('Task Added');
      }
    }, err => {
      console.log(err);
    })
  }
  getTask(id) {
    this.tasklist = [];
    this.taskToggle = false;
    this.selectedMentor = null;
    this.service.getTask(id).subscribe(data => {
      if (data.task) {
        this.tasklist = data.task;
      } else {
        this.toastr.info('No task found')
      }
    }, err => {
      this.toastr.info(err.error.message)
    })
  }
  deleteMentor(id, index) {
    this.service.deleteMentor(id).subscribe(data => {
      this.toastr.success('Deleted Successfully')
      this.mentors.splice(index, 1)
    }, err => {
      this.toastr.error(err.error.message)
    })
  }
}

class Student {
      constructor(name, surname, birthYear) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
        this.grades = [];
        this.attendance = new Array(25).fill(null);
        this.attIndex = 0;
      }
      getAge() {
        return new Date().getFullYear() - this.birthYear;
      }
      addGrade(g) { this.grades.push(g); }
      getAverageGrade() {
        return this.grades.length ?
          this.grades.reduce((a,b)=>a+b,0)/this.grades.length : 0;
      }
      present(){ 
        if (this.attIndex < 25){
            this.attendance[this.attIndex++] = true;  
        } 
    }
      absent(){ 
        if (this.attIndex < 25) this.attendance[this.attIndex++] = false; 
    }
      attendanceRate() {
        let done = this.attendance.filter(v=>v!==null);
        return done.length ? done.filter(v=>v).length / done.length : 0;
      }
      summary() {
        let g=this.getAverageGrade(), a=this.attendanceRate();
        if (g>90 && a>0.9) return "Молодець!";
        if (g>90 || a>0.9) return "Добре, але можна краще";
        return "Редиска!";
      }
      info() {
        return `${this.name} ${this.surname}
Вік: ${this.getAge()}
Середній бал: ${this.getAverageGrade().toFixed(1)}
Відвідуваність: ${(this.attendanceRate()*100).toFixed(0)}%
Підсумок: ${this.summary()}`;
      }
    }
    let students = [
      new Student("Анна", "Іванова", 2002),
      new Student("Богдан", "Петренко", 2000)
    ];
    function render(){
      let div = document.getElementById("students");
      div.innerHTML = "";
      students.forEach((st, i) => {
        let box = document.createElement("div");
        box.className = "student";
        let pre = document.createElement("pre");
        pre.textContent = st.info();
        let btns = `
          <button onclick="students[${i}].present();render()">Present()</button>
          <button onclick="students[${i}].absent();render()">Absent()</button>
          <button onclick="students[${i}].addGrade(100);render()">Add grade 100</button>
          <button onclick="alert(students[${i}].getAge())">getAge()</button>
          <button onclick="alert(students[${i}].getAverageGrade().toFixed(1))">getAverageGrade()</button>
          <button onclick="alert(students[${i}].summary())">summary()</button>
        `;
        box.innerHTML = `<h3>${st.name} ${st.surname}</h3>` + btns;
        box.appendChild(pre);
        div.appendChild(box);
      });
    }
    render();
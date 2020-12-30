function removeAluno(id){
    console.log('remove aluno' + id)
    axios.delete('/alunos/'+id)
        .then(res => res.redirect('/alunos'))
        //.then(response => window.location.assign('/alunos/'))
        .catch(e => res.render('error', {error: e}))
    
}
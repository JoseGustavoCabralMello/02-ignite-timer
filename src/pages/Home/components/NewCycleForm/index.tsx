import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";


export function NewCycleForm() {
  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalha em</label>
          <TaskInput 
            id="task"
            list="task-sugestion" 
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-sugestion">
            <option value="Projeto1"></option>
            <option value="Projeto2"></option>
            <option value="Projeto3"></option>
            <option value="Projeto4"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
           type="number" 
           id="minutesAmount" 
           placeholder="00" 
           step={5} 
           min={5} 
           max={60}
           disabled={!!activeCycle}
           {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
  )
}
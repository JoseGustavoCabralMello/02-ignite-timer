import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCoundownButton, TaskInput } from "./styles";

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data) {

  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalha em</label>
          <TaskInput 
            id="task"
            list="task-sugestion" 
            placeholder="Dê um nome para o seu projeto"
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
           {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCoundownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCoundownButton>
      </form>
    </HomeContainer>
  )
}
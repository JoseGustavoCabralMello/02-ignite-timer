import { useState } from "react";
import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver  } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCoundownButton, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O intervalo precisa ser de no máximo 60 minutos.'),
});

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const curretSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(curretSeconds / 60)
  const secondsAmount = curretSeconds % 60

  const minutes = String(minutesAmount).padStart(2,'0')
  const seconds = String(secondsAmount).padStart(2,'0')

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCoundownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCoundownButton>
      </form>
    </HomeContainer>
  )
}
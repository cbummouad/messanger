<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $senderID= $this->faker->randomElement([0,1]);
        if ($senderID===0){
            $senderID = $this->faker->randomElement(User::where('id', '!=', 1)->pluck('id')->toArray());
            $reseiverId = 1;
        }
        else{
            $reseiverId = $this->faker->randomElement(User::pluck('id')->toArray());
        }

        $groupId = null ;
        if ($this->faker->boolean(50)){
            $groupId = $this->faker->randomElement(Group::pluck('id')->toArray());
            $group = Group::find($groupId);
            $senderID = $this->faker->randomElement($group->users->pluck('id')->toArray());
            $reseiverId = null;
        }

        return [
            'sender_id' => $senderID,
            'receiver_id' => $reseiverId ,
            'group_id' => $groupId,
            'message' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => now(),
        ];
    }
}
